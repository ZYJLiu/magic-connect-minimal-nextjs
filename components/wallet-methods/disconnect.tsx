import React, { useCallback, useState } from "react"
import Loading from "public/loading.svg"
import { useMagicContext } from "@/context/magic-context"
import Image from "next/image"

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

const Disconnect = ({ setAccount }: Props) => {
  const { magic } = useMagicContext()
  const [disabled, setDisabled] = useState(false)

  const disconnect = useCallback(async () => {
    if (!magic) return
    try {
      setDisabled(true)
      await magic.wallet.disconnect()
      setDisabled(false)
      setAccount(null)
    } catch (error) {
      setDisabled(false)
      console.error(error)
    }
  }, [magic])

  return (
    <div className="wallet-method-container">
      <button
        className="wallet-method"
        onClick={disconnect}
        disabled={disabled}
      >
        {disabled ? (
          <div className="loadingContainer" style={{ width: "115px" }}>
            <Image className="loading" alt="loading" src={Loading} />
          </div>
        ) : (
          "disconnect()"
        )}
      </button>
      <div className="wallet-method-desc">Disconnects user from dApp.</div>
    </div>
  )
}

export default Disconnect

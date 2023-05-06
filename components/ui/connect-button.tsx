import React, { useCallback } from "react"
import { useMagicContext } from "@/context/magic-context"

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

const ConnectButton = ({ setAccount }: Props) => {
  const { magic } = useMagicContext()

  const connect = async () => {
    if (!magic) return
    try {
      const accounts = await magic.wallet.connectWithUI()
      console.log(accounts)
      setAccount(accounts[0])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button className="connect-button" onClick={connect}>
        Connect
      </button>
    </div>
  )
}

export default ConnectButton

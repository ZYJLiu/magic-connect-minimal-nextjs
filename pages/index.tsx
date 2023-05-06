import ConnectButton from "@/components/ui/connect-button"
import { useMagicContext } from "@/context/magic-context"
import { useCallback, useState } from "react"
import WalletMethods from "@/components/wallet-methods"
import LoginPageBackground from "public/login.svg"
import AppHeader from "@/components/app-header"
import Spacer from "@/components/ui/spacer"

export default function Home() {
  const { magic } = useMagicContext()
  const [disabled, setDisabled] = useState(false)
  const [account, setAccount] = useState<string | null>(null)

  const connect = useCallback(async () => {
    if (!magic) return
    try {
      setDisabled(true)
      const accounts = await magic.wallet.connectWithUI()
      setDisabled(false)
      setAccount(accounts[0])
    } catch (error) {
      setDisabled(false)
      console.error(error)
    }
  }, [magic])

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${LoginPageBackground})`,
      }}
    >
      <AppHeader />
      <Spacer size={32} />
      {!account ? (
        <ConnectButton onClick={connect} disabled={disabled} />
      ) : (
        <WalletMethods setAccount={setAccount} />
      )}
    </div>
  )
}

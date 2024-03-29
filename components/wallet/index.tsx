import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Divider from "../ui/divider"
import Loading from "public/loading.svg"
import CardLabel from "../ui/card-label"
import Card from "../ui/card"
import CardHeader from "../ui/card-header"
import { useMagicContext } from "@/context/magic-context"

interface Props {
  account: string | null
  setAccount: React.Dispatch<React.SetStateAction<string | null>>
}

const UserInfo = ({ account, setAccount }: Props) => {
  const { magic, web3 } = useMagicContext()

  const [balance, setBalance] = useState("...")
  const [copied, setCopied] = useState("Copy")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const publicAddress = account
  const tokenSymbol = "ETH"

  useEffect(() => {
    refresh()
  }, [web3])

  useEffect(() => {
    setBalance("...")
  }, [magic])

  const disconnect = useCallback(async () => {
    if (magic) {
      await magic.wallet.disconnect()
      setAccount(null)
    }
  }, [magic])

  const copy = useCallback(() => {
    if (publicAddress && copied === "Copy") {
      setCopied("Copied!")
      navigator.clipboard.writeText(publicAddress)
      setTimeout(() => {
        setCopied("Copy")
      }, 1000)
    }
  }, [])

  const getBalance = useCallback(async () => {
    if (publicAddress && web3) {
      const balance = await web3.eth.getBalance(publicAddress)
      setBalance(web3.utils.fromWei(balance))
      console.log("BALANCE: ", balance)
    }
  }, [web3])

  const refresh = useCallback(async () => {
    setIsRefreshing(true)
    await getBalance()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 500)
  }, [web3])

  return (
    <Card>
      <CardHeader id="wallet">Wallet</CardHeader>
      <CardLabel
        leftHeader="Status"
        rightAction={<div onClick={disconnect}>Disconnect</div>}
        isDisconnect
      />
      <div className="flex-row">
        <div className="green-dot" />
        <div className="connected">Connected</div>
      </div>
      <Divider />
      <CardLabel
        leftHeader="Address"
        rightAction={<div onClick={copy}>{copied}</div>}
      />
      <div className="code">{publicAddress}</div>
      <Divider />
      <CardLabel
        style={{ height: "20px" }}
        leftHeader="Balance"
        rightAction={
          isRefreshing ? (
            <div className="loading-container">
              <Image className="loading" alt="loading" src={Loading} />
            </div>
          ) : (
            <div onClick={refresh}>Refresh</div>
          )
        }
      />
      <div className="code">
        {balance.substring(0, 7)} {tokenSymbol}
      </div>
    </Card>
  )
}

export default UserInfo

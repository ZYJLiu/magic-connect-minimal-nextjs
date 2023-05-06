import React from "react"
import Card from "../ui/card"
import CardHeader from "../ui/card-header"
import PersonalSign from "./personal-sign"

interface Props {
  account: string | null
}

export const Signing = ({ account }: Props) => {
  return (
    <Card>
      <CardHeader id="signing">Signing</CardHeader>
      <PersonalSign account={account} />
    </Card>
  )
}

export default Signing

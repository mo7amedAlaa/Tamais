import AppointReplyAndDetails from "@/app/_components/pages/ElectronicOffice/AppointReplyAndDetails"

function page({ params }) {
  console.log(params)
  return <AppointReplyAndDetails appointID={params.appointID} />
}

export default page

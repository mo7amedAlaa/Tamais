import ConsultationReplyAndDetails from "@/app/_components/pages/ElectronicOffice/ConsultationReplyAndDetails"

function page({ params }) {
  console.log(params)
  return <ConsultationReplyAndDetails consultID={params.consultationID} />
}

export default page

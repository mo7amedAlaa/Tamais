import ConsultationReplyAndDetailsClient from "@/app/_components/pages/ElectronicOffice/ConsultationReplyAndDetailsFormCleint"


function page({ params }) {
  return <ConsultationReplyAndDetailsClient consultID={params.consultationID} />
}

export default page

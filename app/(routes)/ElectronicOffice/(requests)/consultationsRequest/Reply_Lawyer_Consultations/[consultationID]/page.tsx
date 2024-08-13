import ConsultationReplyAndDetailsLawyer from "@/app/_components/pages/ElectronicOffice/ConsultationReplyAndDetailsFormLawyer"

function page({ params }) {
  return <ConsultationReplyAndDetailsLawyer consultID={params.consultationID} />
}

export default page

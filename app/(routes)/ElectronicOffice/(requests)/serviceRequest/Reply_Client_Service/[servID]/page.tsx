import ServiceReplyAndDetailsClient from "@/app/_components/pages/ElectronicOffice/ServiecesReplyAndDetailsFormCleint"



function page({ params }) {
  return <ServiceReplyAndDetailsClient servID={params.servID} />
}

export default page

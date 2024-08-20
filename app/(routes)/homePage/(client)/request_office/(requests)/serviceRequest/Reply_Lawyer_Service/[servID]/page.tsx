import ServicesReplyAndDetailsForLawyer from "@/app/_components/pages/ElectronicOffice/ServicesReplyAndDetailsForLawyer"
function page({ params }) {
  return <ServicesReplyAndDetailsForLawyer servID={params.servID} />
}

export default page

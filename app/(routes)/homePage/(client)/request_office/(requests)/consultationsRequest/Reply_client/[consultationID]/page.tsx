import Consultation_details_client from "@/app/_components/Requestoffice/Consultations/Consultation_details_client"



function page({ params }) {
  return <Consultation_details_client consultID={params.consultationID} />
}

export default page

import Consultation_details_digital from "@/app/_components/Requestoffice/Consultations/Consultation_details_digital"
function page({ params }) {
  return <Consultation_details_digital consultID={params.consultationID} />
}

export default page

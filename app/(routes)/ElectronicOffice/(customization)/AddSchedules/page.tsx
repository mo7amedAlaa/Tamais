import CustomizationCard from "@/app/_components/pages/ElectronicOffice/CustomizationCard"
import SecondHead from "@/app/_components/ui/SecondHead"

 

function Page() {
  return (
    <div className="container m-auto  min-h-screen">
      <SecondHead title="تخصيص المواعيد"/>
      <div className=""></div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[25px] gap-y-4  justify-center py-3 md:py-6">
      <CustomizationCard title={'تأسيس شركة'} active={true} price1={'300'} price2={'500'} price3={'600'} />
      <CustomizationCard title={'تأسيس شركة'} active={true} price1={'300'} price2={'500'} price3={'600'} />
      <CustomizationCard title={'تأسيس شركة'} active={true} price1={'300'} price2={'500'} price3={'600'} />
      <CustomizationCard title={'تأسيس شركة'} active={true} price1={'300'} price2={'500'} price3={'600'} />
      <CustomizationCard title={'تأسيس شركة'} active={true} price1={'300'} price2={'500'} price3={'600'} />
      <CustomizationCard title={'تأسيس شركة'} active={true} price1={'300'} price2={'500'} price3={'600'} />
      <CustomizationCard title={'تأسيس شركة'} active={true} price1={'300'} price2={'500'} price3={'600'} />
      <CustomizationCard title={'تأسيس شركة'} active={true} price1={'300'} price2={'500'} price3={'600'} />
      
    </div>

    </div>
   
  )
}

export default Page

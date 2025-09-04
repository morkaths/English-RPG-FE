import CardBox from 'src/components/common/shared/CardBox';
import PhonemeTable from "src/components/pronunciation/PhonemeTable";

const PronunciationPage = () => {
  return (
    <div className="grid grid-cols-12 gap-30">
      {/* Header */}
      <div className="col-span-12">

      </div>
      {/* Main Content */}
      <div className="lg:col-span-8 col-span-12">
        <PhonemeTable />
      </div>
      {/* Sidebar */}
      <div className="lg:col-span-4 col-span-12">
        <CardBox>
          <h5 className="card-title">Sidebar</h5>
        </CardBox>
      </div>
    </div>
  );
}

export default PronunciationPage;
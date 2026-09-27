import { PageContainer } from "@/components/layout/PageContainer";
import { BeneficiaryWizard } from "@/components/wizard/BeneficiaryWizard";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1000px] flex-1 p-3 sm:p-4">
      <PageContainer
        title="Occupational Fitness Examination"
        description="Create a beneficiary, then the required medical form and mandatory lab tests are determined automatically from their occupation and exam protocol (NCOSH regulation)."
      >
        <BeneficiaryWizard />
      </PageContainer>
    </main>
  );
}

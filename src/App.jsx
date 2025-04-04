import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Dashboard } from "./pages/Dashboard";
import { VetConsultation } from "./pages/VetConsultation";
import { PetProfile } from "./pages/ProfilePet";
import { SymptomInput } from "./pages/SymptomInput";
import { TreatmentRecommendations } from "./pages/TreatmentRecomd";

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile/:petId?" element={<PetProfile />} />
          <Route path="/symptoms" element={<SymptomInput />} />
          <Route path="/consultation" element={<VetConsultation />} />
          <Route
            path="/recommendations"
            element={<TreatmentRecommendations />}
          />

          {/* Optional: Redirect any unmatched route to the dashboard */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

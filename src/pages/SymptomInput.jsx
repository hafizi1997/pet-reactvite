import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  AlertCircleIcon,
} from "lucide-react";

export const SymptomInput = () => {
  const navigate = useNavigate();
  const [petType, setPetType] = useState("");
  const [petInfo, setPetInfo] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, error, sentRequest, clearError } = useHttpClient();
  const commonSymptoms = [
    "Vomiting",
    "Diarrhea",
    "Lethargy",
    "Loss of appetite",
    "Excessive thirst",
    "Coughing",
    "Sneezing",
    "Limping",
    "Itching/Scratching",
    "Hair loss",
    "Bad breath",
    "Eye discharge",
  ];

  const handleSymptomToggle = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleForm = async () => {
    const infocreate = JSON.stringify({
      pet_id: petType,
      symtoms: symptoms.join(", "),
      days: 3,
      SeverityLevel: 3,
    });
    try {
      if (petType) {
        console.log(infocreate);
        const url =
          import.meta.env.VITE_REACT_APP_BACKEND_URL + "/pet/createsymtom";
        const responseData = await sentRequest(url, "PATCH", infocreate, {
          "Content-Type": "application/json",
        });
        console.log(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    handleForm();
    setTimeout(() => {
      setIsSubmitted(false);
      setPetType("");
      setSymptoms([]);
      setDuration("");
      setSeverity("");
      setNotes("");
      navigate("/recommendations");
    }, 2000);
  };
  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const url =
          import.meta.env.VITE_REACT_APP_BACKEND_URL + `/pet/dashboard`;
        const responseData = await sentRequest(url);
        setPetInfo(responseData.pets);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPetInfo();
  }, [sentRequest]);
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Symptom Input</h1>
      <p className="text-gray-600 mb-8">
        Record your pet's symptoms to get personalized care recommendations.
      </p>
      {isSubmitted ? (
        <Card className="bg-green-50 border-green-100 mb-8">
          <div className="flex items-center">
            <CheckCircleIcon className="text-green-500 mr-3" size={24} />
            <div>
              <h3 className="font-semibold text-green-700">
                Symptoms Recorded Successfully
              </h3>
              <p className="text-green-600">
                Your pet's symptoms have been saved. You'll be redirected to
                recommendations shortly.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pet Information
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="petType">
                Pet Type
              </label>
              <div className="relative">
                <select
                  id="petType"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select pet type</option>
                  {petInfo &&
                    !isLoading &&
                    petInfo.map((pet) => (
                      <option key={pet._id} value={pet._id}>
                        {pet.name}
                      </option>
                    ))}
                </select>
                <ChevronDownIcon
                  className="absolute right-3 top-3.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>
          </Card>
          <Card className="mb-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Symptoms
            </h2>
            <div className="mb-6">
              <label className="block text-gray-700 mb-3">
                Common Symptoms
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonSymptoms.map((symptom) => (
                  <div
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`px-4 py-3 border rounded-lg cursor-pointer transition-all ${
                      symptoms.includes(symptom)
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 mr-2 rounded-full border flex items-center justify-center ${
                          symptoms.includes(symptom)
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                        }`}
                      >
                        {symptoms.includes(symptom) && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span>{symptom}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm flex items-center">
              <AlertCircleIcon size={16} className="mr-1" />
              This is not a substitute for veterinary care
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save Symptoms</Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

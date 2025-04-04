import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import {
  AlertCircleIcon,
  ClockIcon,
  CalendarIcon,
  PrinterIcon,
  ShareIcon,
  ChevronRightIcon,
  HeartPulseIcon,
  ThermometerIcon,
  PillIcon,
  ActivityIcon,
  HeartIcon,
} from "lucide-react";

export const TreatmentRecommendations = () => {
  const mockPetData = {
    name: "Milo",
    type: "Cat",
    symptoms: ["Vomiting", "Lethargy", "Loss of appetite"],
    severity: "moderate",
    duration: "few_days",
  };

  const recommendations = [
    {
      id: 1,
      type: "urgent",
      title: "Schedule Veterinary Visit",
      description:
        "Based on the symptoms and duration, a veterinary examination is recommended within 24 hours.",
      icon: <HeartPulseIcon size={20} />,
      actions: [
        "Call your regular vet",
        "If unavailable, locate emergency vet services",
        "Bring recent stool sample if possible",
      ],
      timing: "Within 24 hours",
    },
    {
      id: 2,
      type: "immediate",
      title: "Dietary Modifications",
      description: "Temporary diet adjustment to help ease digestive issues.",
      icon: <div size={20} />,
      actions: [
        "Withhold food for 12 hours",
        "Offer small amounts of water frequently",
        "When reintroducing food, start with bland diet (boiled chicken & rice)",
        "Feed small portions every 4-6 hours",
      ],
      timing: "Start immediately",
    },
    {
      id: 3,
      type: "monitoring",
      title: "Monitor Vital Signs",
      description: "Keep track of these important health indicators.",
      icon: <ThermometerIcon size={20} />,
      actions: [
        "Check hydration levels",
        "Monitor water intake",
        "Note frequency of vomiting",
        "Track energy levels",
      ],
      timing: "Ongoing",
    },
    {
      id: 4,
      type: "care",
      title: "Comfort Care",
      description: "Ensure your pet is comfortable during recovery.",
      icon: <HeartIcon size={20} />,
      actions: [
        "Provide quiet rest area",
        "Maintain normal room temperature",
        "Keep fresh water available",
        "Monitor bathroom habits",
      ],
      timing: "Ongoing",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Treatment Recommendations
          </h1>
          <p className="text-gray-600">
            Personalized care plan based on reported symptoms
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <PrinterIcon size={16} className="mr-2" /> Print
          </Button>
          <Button variant="outline" size="sm">
            <ShareIcon size={16} className="mr-2" /> Share
          </Button>
        </div>
      </div>

      <Card className="mb-6 bg-blue-50 border-blue-100 bg-white">
        <div className="flex items-start">
          <ActivityIcon className="text-blue-500 mt-1 mr-3" size={24} />
          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Symptom Summary
            </h2>
            <div className="space-y-2">
              <p className="text-blue-700">
                Pet:{" "}
                <span className="font-medium">
                  {mockPetData.type} ({mockPetData.name})
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {mockPetData.symptoms.map((symptom) => (
                  <Badge key={symptom} variant="info">
                    {symptom}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4 text-sm text-blue-700 mt-2">
                <span className="flex items-center">
                  <ClockIcon size={16} className="mr-1" /> Duration:{" "}
                  {mockPetData.duration.replace("_", " ")}
                </span>
                <span className="flex items-center">
                  <AlertCircleIcon size={16} className="mr-1" /> Severity:{" "}
                  {mockPetData.severity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="relative overflow-hidden bg-white">
            <div className="flex items-start">
              <div
                className={`p-2 rounded-lg mr-4 ${
                  rec.type === "urgent"
                    ? "bg-red-50"
                    : rec.type === "immediate"
                    ? "bg-yellow-50"
                    : rec.type === "monitoring"
                    ? "bg-blue-50"
                    : "bg-green-50"
                }`}
              >
                {rec.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {rec.title}
                    </h3>
                    <p className="text-gray-600">{rec.description}</p>
                  </div>
                  <Badge
                    variant={
                      rec.type === "urgent"
                        ? "urgent"
                        : rec.type === "immediate"
                        ? "warning"
                        : "info"
                    }
                    size="md"
                  >
                    {rec.timing}
                  </Badge>
                </div>
                <ul className="mt-4 space-y-2">
                  {rec.actions.map((action, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <ChevronRightIcon
                        size={16}
                        className="mr-2 text-gray-400"
                      />{" "}
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
        <div className="flex items-center text-yellow-800">
          <AlertCircleIcon size={20} className="mr-2" />
          <p className="text-sm">
            These recommendations are based on reported symptoms and should not
            replace professional veterinary advice. If your pet's condition
            worsens, seek immediate veterinary care.
          </p>
        </div>
      </div>
    </div>
  );
};

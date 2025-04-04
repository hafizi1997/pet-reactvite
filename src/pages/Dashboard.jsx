import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { useHttpClient } from "../hooks/http-hook";
import { Button } from "../components/Button";
import { NavLink } from "react-router-dom";
import {
  PawPrintIcon,
  CalendarIcon,
  ClipboardIcon,
  BellIcon,
  MessageSquareIcon,
} from "lucide-react";

export const Dashboard = () => {
  const { isLoading, error, sentRequest, clearError } = useHttpClient();
  const [petData, setPetData] = useState([]);
  const [healthRecords, setHealthRecords] = useState(0);
  const [reminderCount, setReminderCount] = useState(0);
  const [isactiveCount, setIsactiveCount] = useState(0);
  useEffect(() => {
    const fetchPet = async () => {
      try {
        const url =
          import.meta.env.VITE_REACT_APP_BACKEND_URL + "/pet/dashboard/";
        const responseData = await sentRequest(url);
        setPetData(responseData.pets);
        setHealthRecords(responseData.health_records_count);
        let reminderCount = 0;
        let isactiveCount = 0;
        responseData.pets.forEach((pet) => {
          if (pet.reminders === 1) reminderCount++;
          if (pet.isactive === 1) isactiveCount++;
        });
        setReminderCount(reminderCount);
        setIsactiveCount(isactiveCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPet();
  }, [sentRequest]);
  const petCard =
    petData &&
    !isLoading &&
    petData.map((pet) => {
      return (
        <Card
          key={pet._id}
          className={pet.reminders === 1 ? "bg-red-100" : "bg-white"}
        >
          <div className="flex">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex-shrink-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
                alt="Dog"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {pet.name}
              </h3>
              <p className="text-gray-600">
                {pet.breed} • {pet.age} years old
              </p>
              <div className="mt-2">
                {pet.isactive === 0 && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-blue-600 rounded-full mr-2">
                    Died
                  </span>
                )}
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full mr-2">
                  Vaccinated
                </span>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">
                  Healthy
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <span className="text-gray-600">Last checkup:</span>
                <span className="font-medium text-gray-800 ml-2">
                  April 10, 2023
                </span>
              </div>
              <NavLink to={`/profile/${pet._id || ""}`}>
                <Button type="submit">View</Button>
              </NavLink>
            </div>
          </div>
        </Card>
      );
    });
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">
          Pet Health Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of your pet's health.
        </p>
      </header>
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <PawPrintIcon size={20} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Pets</p>
              <p className="text-lg font-semibold text-gray-800">
                {petData ? isactiveCount : 0}
              </p>
            </div>
          </div>
        </Card>
        <Card className="bg-purple-50">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <ClipboardIcon size={20} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Health Records
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {petData && healthRecords}
              </p>
            </div>
          </div>
        </Card>
        <Card className="bg-amber-50">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-500">
              <BellIcon size={20} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Reminders</p>
              <p className="text-lg font-semibold text-gray-800">
                {reminderCount && !isLoading && reminderCount} Active
              </p>
            </div>
          </div>
        </Card>
      </div>
      {/* Pet profiles overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{petCard}</div>
      {/* Recent activity */}
      <Card className="bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 text-blue-500">
              <PawPrintIcon size={16} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">
                Max's vaccination updated
              </p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-green-100 text-green-500">
              <ClipboardIcon size={16} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">
                Luna's weight check completed
              </p>
              <p className="text-xs text-gray-500">5 days ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-purple-100 text-purple-500">
              <MessageSquareIcon size={16} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">
                Vet consultation for Max
              </p>
              <p className="text-xs text-gray-500">1 week ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

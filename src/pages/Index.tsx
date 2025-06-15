import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Users, Calendar, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto pink-gradient rounded-2xl flex items-center justify-center mb-6">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900">Photography Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete admin dashboard for managing your photography booking platform. 
            Monitor users, bookings, disputes, and financial transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
            <Users className="w-8 h-8 text-pink-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
            <p className="text-gray-600">Manage photographers and clients with advanced filtering and actions.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
            <Calendar className="w-8 h-8 text-pink-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Control</h3>
            <p className="text-gray-600">Monitor all bookings, approve requests, and resolve issues.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
            <BarChart3 className="w-8 h-8 text-pink-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">Track revenue, commissions, and platform performance metrics.</p>
          </div>
        </div>

        <Button 
          onClick={() => navigate('/admin/dashboard')} 
          className="pink-gradient text-white px-8 py-4 text-lg font-semibold rounded-xl glow-on-hover transform hover:scale-105 transition-all"
        >
          Enter Admin Dashboard
        </Button>

        <div className="flex justify-center mt-8">
          <Link to="/auth" className="px-5 py-2 bg-pink-600 text-white rounded font-bold shadow hover:bg-pink-700 focus:outline-none ring-2 ring-pink-200">
            Sign In / Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { 
    BookOpen, 
    Send, 
    Archive, 
    RefreshCcw, 
    CheckCircle, 
    AlertTriangle, 
    Share2, 
    Trash2,
    Handshake, 
    FileText
  } from "lucide-react";
  
  const interlibraryStats = {
    borrowed: "120",  // Books borrowed from other libraries
    lent: "75",  // Books lent to other libraries
    returned: "65",  // Books you returned
    theirReturned: "80",  // Books they returned to you
    pendingRequests: "10",  // Pending requests to borrow or lend
    approvedRequests: "15",  // Approved borrowing/lending requests
    theirPendingRequests: "12",  // Their pending requests to borrow or lend
    cancelledRequests: "5",  // Cancelled requests (both yours and theirs)
    totalRequests: "30",  // Total requests made (borrow, lend)
    booksInCirculation: "200"  // Total books in circulation (borrowed and lent)
  };
  
  const stats = [
    {
      title: "What You Borrowed",
      value: interlibraryStats.borrowed,
      icon: <BookOpen className="text-blue-500" />,
    },
    {
      title: "What You Lent",
      value: interlibraryStats.lent,
      icon: <Send className="text-green-500" />,
    },
    {
      title: "What You Returned",
      value: interlibraryStats.returned,
      icon: <CheckCircle className="text-teal-500" />,
    },
    {
      title: "They Returned",
      value: interlibraryStats.theirReturned,
      icon: <RefreshCcw className="text-yellow-500" />,
    },
    {
      title: "Pending Requests",
      value: interlibraryStats.pendingRequests,
      icon: <AlertTriangle className="text-red-500" />,
    },
    {
      title: "Approved Requests",
      value: interlibraryStats.approvedRequests,
      icon: <Handshake className="text-green-500" />,
    },
    {
      title: "Their Pending Requests",
      value: interlibraryStats.theirPendingRequests,
      icon: <Share2 className="text-indigo-500" />,
    },
    {
      title: "Cancelled Requests",
      value: interlibraryStats.cancelledRequests,
      icon: <Trash2 className="text-gray-500" />,
    },
    {
      title: "Total Requests",
      value: interlibraryStats.totalRequests,
      icon: <FileText className="text-purple-500" />,
    },
    {
      title: "Books in Circulation",
      value: interlibraryStats.booksInCirculation,
      icon: <Archive className="text-orange-500" />,
    }
  ];
  
  const InterLibraryOverview = () => {
    return (
      <div className="grid grid-cols-1 mt-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white dark:bg-gray-800 shadow-md rounded-2xl"
          >
            <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full">
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default InterLibraryOverview;
  
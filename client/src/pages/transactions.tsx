import React, { useState, useEffect } from "react";
import {
  MagnifyingGlass,
  Pencil,
  PencilSimple,
  Trash,
  TrashSimple,
} from "phosphor-react";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import EditExpenseForm from "../components/EditExpenseForm";
import EditRevenueForm from "../components/EditRevenueForm";
import axios from "axios";
import BaseUrl from "../config";
import { fetchRevenues, fetchExpenses } from "../utils/fetchData";

// Define interfaces for expenses and revenues
interface Expense {
  _id: string;
  category : string;
  name: string;
  amount: number;
 
}

interface Revenue {
  _id: string;
  name: string;
  amount: number;
 
}

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchExpenses(dispatch);
    fetchRevenues(dispatch);
  }, [dispatch]);

  const { expenses } = useAppSelector((state: any) => state.ui);
  const { revenues } = useAppSelector((state: any) => state.revenue);

  const today = new Date().toLocaleDateString();

  const [sortedExpenses, setSortedExpenses] = useState<Expense[]>([]);
  const [sortedRevenues, setSortedRevenues] = useState<Revenue[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResultsExist, setSearchResultsExist] = useState<boolean>(true);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isEditRevFormOpen, setIsEditRevFormOpen] = useState<boolean>(false);
  const [selectedRevenue, setSelectedRevenue] = useState<Revenue | null>(null);

  useEffect(() => {
    // Update sorted expenses whenever expenses change
    if (Array.isArray(expenses)) {
      setSortedExpenses(expenses);
    }
  }, [expenses]);

  useEffect(() => {
    if (Array.isArray(revenues)) {
      setSortedRevenues(revenues);
    }
  }, [revenues]);

  // Function to sort expenses by amount
  const sortExpensesByAmount = (order: "asc" | "desc") => {
    const sorted = [...expenses].sort((a: Expense, b: Expense) =>
      order === "asc" ? a.amount - b.amount : b.amount - a.amount
    );
    setSortedExpenses(sorted);
    setSortOrder(order);
  };

  // Function to sort revenues by amount
  const sortRevenuesByAmount = (order: "asc" | "desc") => {
    const sorted = [...revenues].sort((a: Revenue, b: Revenue) =>
      order === "asc" ? a.amount - b.amount : b.amount - a.amount
    );
    setSortedRevenues(sorted);
    setSortOrder(order);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredExpenses = expenses.filter((expense: Expense) =>
      expense.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedExpenses(filteredExpenses);

    const filteredRevenues = revenues.filter((revenue: Revenue) =>
      revenue.name.toLowerCase().includes(query.toLowerCase())
    );
    setSortedRevenues(filteredRevenues);

    // Check if any search results exist
    setSearchResultsExist(
      filteredExpenses.length > 0 || filteredRevenues.length > 0
    );
  };

  const handleEditExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditFormOpen(true);
  };

  const handleSaveExpense = (updatedExpense: Expense) => {
    setSortedExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      )
    );
  };

  const handleEditRevenueClick = (revenue: Revenue) => {
    setSelectedRevenue(revenue);
    setIsEditRevFormOpen(true);
  };

  const handleSaveRevenue = (updatedRevenue: Revenue) => {
    setSortedRevenues((prevRevenues) =>
      prevRevenues.map((revenue) =>
        revenue._id === updatedRevenue._id ? updatedRevenue : revenue
      )
    );
  };

  return (
    <div className={`flex min-h-screen`}>
      <div className="flex flex-col mt-24 lg:ml-64">
        {isEditFormOpen && selectedExpense && (
          <EditExpenseForm
            expense={selectedExpense}
            onClose={() => setIsEditFormOpen(false)}
            onSave={handleSaveExpense}
          />
        )}
        {isEditRevFormOpen && selectedRevenue && (
          <EditRevenueForm
            revenue={selectedRevenue}
            onClose={() => setIsEditRevFormOpen(false)}
            onSave={handleSaveRevenue}
          />
        )}
        <div className="lg:ml-12 flex lg:flex-row sm:flex-col items-center sm:gap-y-2 lg:gap-x-10">
          <button
            className="bg-blue-700 h-8 w-48 text-[0.65rem] text-white"
            onClick={() =>
              sortExpensesByAmount(sortOrder === "asc" ? "desc" : "asc")
            }
          >
            Sort Expenses by Amount (
            {sortOrder === "asc" ? "High to low" : "low to high"})
          </button>
          <button
            className="bg-blue-700 h-8 w-48 text-[0.65rem] text-white"
            onClick={() =>
              sortRevenuesByAmount(sortOrder === "asc" ? "desc" : "asc")
            }
          >
            Sort Revenue by Amount (
            {sortOrder === "asc" ? "High to Low" : "Low to High"})
          </button>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-64 h-8 px-2 border border-gray-400 rounded-sm outline-none"
            />
          </div>
        </div>
        {/* Display search results or message */}
        {searchResultsExist ? (
          <>
            <h1 className={`text-2xl font-semibold mt-8 lg:ml-20 sm:ml-2 `}>
              EXPENSES
            </h1>
            <div className="lg:ml-16 sm:ml-2  mt-8 sm:max-w-[22rem] lg:max-w-[62rem] md:max-w-[50rem] mx-auto bg-gray-100 rounded-sm border border-green-400 sm:p-4 sm:overflow-x-auto ">
              {sortedExpenses.length === 0 ? (
                <h1>No Transactions yet</h1>
              ) : (
                <div className="sm:min-w-full">
                  <div className="sm:min-w-[1000px]">
                    <div className="grid grid-cols-6 gap-18 font-bold text-green-700">
                      <div className="">Category</div>
                      <div>Date</div>
                      <div>Title</div>
                      <div>Amount</div>
                      <div>Type</div>
                      <div>Edit</div>
                    </div>
                    {sortedExpenses.map((expense) => (
                      <div
                        key={expense._id}
                        className="grid grid-cols-6 text-black gap-18  lg:mt-2 border-b border-blue-800 py-2"
                      >
                        <div>{expense.category}</div>
                        <div>{today}</div>
                        <div>{expense.name}</div>
                        <div>${expense.amount}</div>
                        <div>Expense</div>
                        <div>
                          <button
                            className=""
                            onClick={() => handleEditExpenseClick(expense)}
                          >
                            <Pencil size={20} color="blue" className="" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <h1 className={`text-2xl font-semibold mt-8 lg:ml-20 sm:ml-2 `}>
              REVENUES
            </h1>
            <div className="lg:ml-16 sm:ml-2 sm:mr-2 mt-8 sm:max-w-[22rem] lg:max-w-[62rem] md:max-w-[50rem] mx-auto bg-gray-100 rounded-sm border border-green-400 sm:p-4 sm:overflow-x-auto">
              {sortedRevenues.length === 0 ? (
                <h1>No Transactions yet</h1>
              ) : (
                <div className="sm:min-w-full">
                  <div className="sm:min-w-[1000px]">
                    <div className="grid grid-cols-6 gap-18 font-bold text-green-700">
                      <div>Category</div>
                      <div>Date</div>
                      <div>Title</div>
                      <div>Amount</div>
                      <div>Type</div>
                      <div>Edit</div>
                    </div>
                    {sortedRevenues.map((revenue) => (
                      <div
                        key={revenue._id}
                        className="grid grid-cols-6 gap-18 text-black lg:mt-2 border-b border-blue-800 py-2"
                      >
                        <div>Income</div>
                        <div>{today}</div>
                        <div>{revenue.name}</div>
                        <div>${revenue.amount}</div>
                        <div>Revenue</div>
                        <div>
                          <button
                            className=""
                            onClick={() => handleEditRevenueClick(revenue)}
                          >
                            <Pencil size={20} color="blue" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <h1 className="ml-20 mt-8">No matching transactions</h1>
        )}
      </div>
    </div>
  );
};

export default Transactions;

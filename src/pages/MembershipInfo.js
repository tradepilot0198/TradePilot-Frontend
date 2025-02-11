import React, { useState, useEffect } from "react";
import "./MembershipInfo.css";
import Footer from "../components/Footer";

const MembershipInfo = () => {
    const [transactions, setTransactions] = useState([]);

    // ✅ Fetch all transactions on component mount
    useEffect(() => {
        fetch("http://localhost:5000/api/get-transactions", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setTransactions(data))
            .catch((error) => console.error("Error fetching transactions:", error));
    }, []);

    // ✅ Handle Payment Status Update (Received or Not Received)
    const updatePaymentStatus = async (paymentId, newStatus) => {
        try {
            const response = await fetch("http://localhost:5000/api/update-payment-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId, newStatus }),
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to update payment status");

            // ✅ Update UI after status change
            setTransactions((prevTransactions) =>
                prevTransactions.map((txn) =>
                    txn.paymentId === paymentId ? { ...txn, status: newStatus } : txn
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (


        <div>


<div className="membership-info-container">
            <h1>Membership Transactions</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Payment ID</th>
                        <th>Email</th>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Paid On</th>
                        <th>Status</th>
                        <th>Expiry</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn) => (
                        <tr key={txn.id}>
                            <td>{txn.id}</td>
                            <td>{txn.paymentId}</td>
                            <td>{txn.email}</td>
                            <td>{txn.memType}</td>
                            <td>₹{txn.amount}</td>
                            <td>{new Date(txn.paid_on_time).toLocaleString()}</td>
                            <td className={`status ${txn.status}`}>{txn.status}</td>
                            <td>{new Date(txn.memExpiry).toLocaleDateString()}</td>
                            <td>
                                {txn.status === "pending" && (
                                    <>
                                        <button
                                            className="btn received"
                                            onClick={() => updatePaymentStatus(txn.paymentId, "completed")}
                                        >
                                            Received
                                        </button>
                                        <button
                                            className="btn not-received"
                                            onClick={() => updatePaymentStatus(txn.paymentId, "failed")}
                                        >
                                            Not Received
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


        <Footer></Footer>


        </div>

        
    );
};

export default MembershipInfo;

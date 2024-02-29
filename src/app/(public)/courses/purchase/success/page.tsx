"use client";
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store";
import { createPaymentAction, getPaymentSessionAction } from "@/store/actions/payment";
import { deleteObject, getObject } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function page() {

  const router = useRouter();
  const dispatch: TypeDispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handlePayment();
  }, []);

  const handlePayment = async () => {
    try {
      const paymentSession = getObject("payment_session");

      if (!paymentSession) {
        router.replace("/");
        return;
      }

      const res1 = await dispatch(getPaymentSessionAction(paymentSession?._id));

      if (!res1.payload?.success) {
        throw new Error("payment failed!")
      }

      const res2 = await dispatch(createPaymentAction({
        userId: paymentSession?.userId,
        courseId: paymentSession?.courseId,
        method: "card",
        status: "completed",
        amount: paymentSession?.amount
      }));

      if (!res2.payload?.success) {
        throw new Error("payment failed!");
      }

      deleteObject("payment_session");
      setLoading(false);

    } catch (error: any) {
      deleteObject("payment_session");
      toast.error(error?.message || "Payment failed!", { position: "bottom-right" });
      router.replace("/courses/purchase/failed");
    }
  }
  
  return (
    <>
      {loading ? <Loading /> : (
        <div className="w-full pe-6 pt-24 flex flex-col gap-2 items-center justify-center">
          <img src="/ui/439.png" alt="" className="h-80" />
          <h2 className="font-bold text-xl">Payment Success!</h2>
          <div className="w-full flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => { router.replace("/") }}
              className="px-4 py-2 border border-purple-800 text-purple-800 rounded-md w-fit font-semibold">
              Back to home
            </button>
            <button
              onClick={() => { router.replace("/student/") }}
              className="px-4 py-2 bg-purple-800 text-white rounded-md font-semibold">
              Go to dashboard
            </button>
          </div>
        </div>
      )}
    </>
  )
}

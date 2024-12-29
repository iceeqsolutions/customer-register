"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import Footer from "@/components/Footer";

interface CustomerProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const CustomerDetails = ({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) => {
  const resolvedParams = use(params);
  const customerId = resolvedParams.customerId;
  const [customer, setCustomer] = useState<CustomerProps | null>(null);

  useEffect(() => {
    async function fetchCustomerDetails() {
      try {
        const response = await fetch(`/api/customers/${customerId}`);
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    }

    fetchCustomerDetails();
  }, [customerId]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="flex flex-col relative top-0 left-0 w-full h-screen z-30 font-specialElite">
      <div className="mt-[450px] flex justify-center w-full bg-opacity-40 bg-stone-700 z-20">
        <div className="w-full max-w-screen-2xl">
          <div className="grid grid-cols-[repeat(auto-fit,min(500px))] place-content-center gap-4">
            <div className="flex flex-col w-1/2 min-w-[440px] h-80 my-8 mx-8 p-8 bg-[url('/contactBg.png')] bg-cover bg-center">
              <h2 className="ml-2 text-3xl pl-3 pt-2 font-bold border-l-8 border-amber-400 text-white">
                {customer.name}
              </h2>
              <p className="ml-2 mt-5 text-2xl text-white">
                Company:
                <span className="p-2 inline text-xl text-black">
                  {customer.company.name}
                </span>
              </p>
              <p className="ml-2 text-2xl text-white">
                City:
                <span className="p-2 inline text-xl text-black">
                  {customer.address.city}
                </span>
              </p>
              <p className="ml-2 text-2xl text-white">
                Email:
                <span className="p-2 inline text-xl text-black">
                  {customer.email}
                </span>
              </p>
              <p className="ml-2 text-2xl text-white">
                Phone:
                <span className="p-2 inline text-xl text-black">
                  {customer.phone}
                </span>
              </p>
              <p className="ml-2 text-2xl text-white">
                Website:
                <span className="p-2 inline text-xl text-black">
                  {customer.website}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-[50px] flex m-auto z-20 w-full">
        <div className=" h-[250px] w-full flex flex-col justify-center gap-2">
          <h2 className="pl-[53vw] text-white text-6xl">Fast</h2>
          <h2 className="pl-[40vw] text-white text-2xl">Easy</h2>
          <h2 className="pl-[60vw] text-white text-4xl">Secure</h2>
          <h2 className="pl-[45vw] text-white text-5xl">Flexible</h2>
        </div>
      </section>

      {/* Static Background */}
      <section className="fixed top-[400px] h-screen w-screen bg-[url('/customerBg.jpg')] bg-cover bg-center z-0"></section>
      <Footer />
    </div>
  );
};

export default CustomerDetails;
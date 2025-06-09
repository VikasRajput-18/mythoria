import React from "react";
import CustomInput from "../../components/custom-input";
import Image from "next/image";

const SignIn = () => {
  return (
    <section className="bg-mystic-800 min-h-screen h-full w-full flex items-center justify-center">
      <form className="max-w-lg w-full border border-mystic-300 rounded-xl border-dashed p-8">
        <div className="flex items-center justify-center w-full">
          <Image
            src={"/assets/mythoria-logo.png"}
            width={100}
            height={100}
            alt="Mythoria"
            className="w-20 h-20 object-contain"
          />
          <h3 className="text-3xl font-semibold -ml-2">Mythoria</h3>
        </div>
        <div className="space-y-4">
          <CustomInput type="text" value="" label="Email" />
          <CustomInput type="password" value="" label="Password" />
          <button
            type="submit"
            className="w-full text-white hover:opacity-85 transition hover:scale-95 font-bold rounded-lg px-6 py-3 bg-mystic-blue-900 mt-2 cursor-pointer"
          >
            Login
          </button>
        </div>
        <div></div>
      </form>
    </section>
  );
};

export default SignIn;

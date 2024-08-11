const Stepper = () => {
  return (
    <div className="my-5">
      <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-yellow-100">
        <ol className="relative z-10 flex justify-between text-sm font-medium text-yellow-500">
          <li className="flex items-center gap-2 bg-white p-2">
            <span className="size-6 rounded-full bg-yellow-100 text-center text-[10px]/6 font-bold">
              {" "}
              1{" "}
            </span>
          </li>

          <li className="flex items-center gap-2 bg-white p-2">
            <span className="size-6 rounded-full bg-yellow-100 text-center text-[10px]/6 font-bold">
              {" "}
              2{" "}
            </span>
          </li>

          <li className="flex items-center gap-2 bg-white p-2 ">
            <span className="size-6 rounded-full bg-yellow-100 text-center text-[10px]/6 font-bold">
              {" "}
              3{" "}
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Stepper;

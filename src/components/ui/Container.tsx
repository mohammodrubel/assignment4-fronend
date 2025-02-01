import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-[98%] sm:w-[95%] md:w-[90%] lg:w-[85%] mx-auto">
      {children}
    </div>
  );
}

export default Container;

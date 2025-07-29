import React from "react";

interface CupomProps extends React.HTMLAttributes<HTMLDivElement> {
  store: string;
  discount: string;
  logo?: string;
}

const Cupom = React.forwardRef<HTMLDivElement, CupomProps>(
  ({ store, discount, logo, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className="w-30 h-48 xl:w-40 xl:h-56 bg-white rounded-[10px] shadow-md relative custom-margim flex-col justify-center items-center cursor-pointer xl:hover:scale-110 transition-transform duration-300"
      >
        <div className="h-[125px] flex justify-center items-center">
          <img
            src={`assets/images/brands/${logo ? logo : "default_logo.png"}`}
            className="rounded-t-[10px] w-full"
          />
        </div>
        <svg
          className="absolute top-27 xl:top-33 w-full h-4 text-white"
          viewBox="0 0 120 20"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,10 Q5,7 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10 T110,10 T120,10 V20 H0 Z"
          />
        </svg>
        <div className="text-center custom-margim">
          <p className="mb-3">{store}</p>
          <p className="custom-title-cupom">{discount}</p>
        </div>
      </div>
    );
  }
);

Cupom.displayName = "Cupom";

export default Cupom;

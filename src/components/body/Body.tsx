import { Dialog } from "@chakra-ui/react";
import Cupom from "../cupom/Cupom";
import Filter from "../filter/Filter";
import Modal from "../modal/Modal";
import Cookies from "js-cookie";
import { useState } from "react";
import ClaimedCupom from "../claimedCupom/ClaimedCupom";
import CardCupom from "../cardCupom/CardCupom";

interface BodyProps {
  cupons: {
    store: string;
    description: string;
    discount: string;
    logo?: string;
    cupom: string;
    link_cupom: string;
    link_partner: string;
  }[];
}

interface SortProps {
  alphabetical: string;
  discount: string;
}

interface SortParameterProps {
  store: string;
  discount: string;
}

const Body = ({ cupons }: BodyProps) => {
  const [claimed, setClaimed] = useState(false);
  const [readyToSelect, setReadyToSelect] = useState(true);
  const [sort, setSort] = useState<SortProps>({
    alphabetical: "",
    discount: "",
  });
  const isClaimed = Cookies.get("cupom") || claimed;

  const compareCupons = (a: SortParameterProps, b: SortParameterProps) => {
    if (sort["alphabetical"]) {
      return a.store.localeCompare(b.store);
    }

    if (sort["discount"]) {
      const getNumber = (str: string) => parseFloat(str.replace(/\D/g, ""));
      return getNumber(b.discount) - getNumber(a.discount);
    }

    return 0;
  };

  return (
    <div className="mt-32 w-full rounded-[15px] bg-white z-50 shadow-[0 -20px 15px -3px rgba(0, 0, 0, 0.482)] text-black custom-padding">
      {isClaimed ? (
        <ClaimedCupom cupom={JSON.parse(Cookies.get("cupom") as string)} />
      ) : (
        <>
          {readyToSelect && !isClaimed ? (
            <div className="flex justify-center">
              <CardCupom setReadyToSelect={setReadyToSelect} cupons={cupons} />
            </div>
          ) : (
            <>
              <Filter cupons={cupons.length} setSort={setSort} />
              <div className="custom-padding grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6">
                {cupons.sort(compareCupons).map((cupom, i) => {
                  return (
                    <Dialog.Root
                      placement="center"
                      key={i}
                      closeOnInteractOutside={false}
                    >
                      <Dialog.Trigger asChild>
                        <Cupom
                          store={cupom.store}
                          discount={cupom.discount}
                          logo={cupom.logo}
                        />
                      </Dialog.Trigger>
                      <Modal cupom={cupons[i]} setClaimed={setClaimed} />
                    </Dialog.Root>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Body;

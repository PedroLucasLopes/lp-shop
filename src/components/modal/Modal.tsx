import { useCallback, useState, type Dispatch } from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import ScratchCard from "../scratchcard/ScratchCard";
import Cookies from "js-cookie";
import { toaster } from "../ui/toaster";
import Confetti from "react-confetti";

interface ModalProps {
  cupom: {
    store: string;
    description: string;
    discount: string;
    logo?: string;
    cupom: string;
    link_cupom: string;
    link_partner: string;
    banner?: string;
  };
  setClaimed: Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ cupom, setClaimed }) => {
  const [scratchedPercent, setScratchedPercent] = useState<number>(0);

  const isScratched = scratchedPercent >= 1;

  const claimCupom = useCallback(() => {
    if (isScratched) {
      Cookies.set("cupom", JSON.stringify(cupom), {
        expires: 36500,
        path: "/",
      });
      navigator.clipboard.writeText(cupom.cupom).then(() => {
        toaster.create({
          title: `Cupom copiado!`,
          type: "success",
        });
      });
      setClaimed(true);
    }

    return;
  }, [cupom, isScratched, setClaimed]);

  if (isScratched)
    Cookies.set("cupom", JSON.stringify(cupom), {
      expires: 36500,
      path: "/",
    });

  return (
    <>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            position="relative"
            overflow="hidden"
            paddingTop="8rem"
          >
            <img
              src={`assets/images/banner/${
                cupom.banner || "shop_yellow_blue.png"
              }`}
              alt={`${cupom.store} banner`}
              style={{
                width: "100%",
                height: "10rem",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                borderTopLeftRadius: "0.375rem",
                borderTopRightRadius: "0.375rem",
              }}
            />
            <Dialog.Body color="black" mt="2rem" p="4">
              <Dialog.Title mb=".5rem">Benefícios</Dialog.Title>
              <p>{cupom.description}</p>
              <div className="flex flex-col justify-center items-center custom-scratch-margin">
                <p className="custom-title-cupom custom-margim">
                  {isScratched ? "Agora é só Aproveitar!" : "Raspe a imagem!"}
                </p>
                <ScratchCard
                  width={window.innerWidth < 426 ? 200 : 250}
                  height={window.innerWidth < 426 ? 200 : 250}
                  image="assets/images/brands/mercantil_blue.png"
                  brushSize={30}
                  scratchedPercent={scratchedPercent}
                  setScratchedPercent={setScratchedPercent}
                  discount={cupom.cupom}
                />
                {isScratched && (
                  <>
                    <Button
                      variant="subtle"
                      mt="1rem"
                      onClick={() => window.open(cupom.link_partner)}
                    >
                      Resgatar Cupom!
                    </Button>
                    <Confetti
                      width={window.innerWidth}
                      height={window.innerHeight}
                    />
                  </>
                )}
              </div>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle" onClick={claimCupom}>
                  {isScratched ? "Voltar" : "Escolher Outro Cupom"}
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                position="absolute"
                top="0.5rem"
                right="0.5rem"
                onClick={claimCupom}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </>
  );
};

export default Modal;

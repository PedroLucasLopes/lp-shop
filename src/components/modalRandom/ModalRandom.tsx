import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import Confetti from "react-confetti";

interface Cupom {
  store: string;
  description: string;
  discount: string;
  logo?: string;
  cupom: string;
  link_cupom: string;
  link_partner: string;
  banner?: string;
}

const ModalRandom = ({ cupons }: { cupons: Cupom[] }) => {
  const [revealCoupon, setRevealCoupon] = useState({} as Cupom);
  const getRandomCupom = useCallback(() => {
    const random: number = Math.floor(Math.random() * cupons.length);
    setRevealCoupon(cupons[random]);
    return random;
  }, [cupons]);
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
            display="flex"
            justifyContent="center"
            width="100%"
          >
            <div className="flex justify-center items-center w-full absolute top-0 left-0 border-t-[0.375]">
              <img
                src={`assets/images/banner/${
                  revealCoupon.cupom
                    ? revealCoupon.banner
                    : "shop_yellow_blue.png"
                }`}
                alt="banner"
                style={{
                  objectFit: revealCoupon.cupom ? "cover" : "contain",
                  width: "100%",
                  height: "10rem",
                }}
              />
            </div>
            <Dialog.Body color="black" mt="2rem" p="4">
              <Dialog.Title mb=".5rem">
                {revealCoupon.description && "Benefícios"}
              </Dialog.Title>
              <p>{revealCoupon.description && revealCoupon.description}</p>
              <div className="flex flex-col justify-center items-center custom-scratch-margin">
                <p className="custom-title-cupom custom-margim">
                  {revealCoupon.cupom
                    ? revealCoupon.store
                    : "Descubra seu cupom!"}
                </p>
                <p className="custom-random-cupom">{revealCoupon.cupom}</p>
                {revealCoupon.cupom ? (
                  <Button
                    variant="subtle"
                    mt="1rem"
                    backgroundColor="#1526FF"
                    color="white"
                    boxShadow="0 2px 3px rgba(0,0,0,0.2)"
                    onClick={() => {
                      window.open(revealCoupon.link_partner);
                    }}
                  >
                    Resgatar Cupom
                  </Button>
                ) : (
                  <Button
                    variant="subtle"
                    mt="1rem"
                    backgroundColor="#1526FF"
                    color="white"
                    boxShadow="0 2px 3px rgba(0,0,0,0.2)"
                    onClick={() => {
                      getRandomCupom();
                    }}
                  >
                    Sortear Cupom
                  </Button>
                )}
                {revealCoupon.cupom && (
                  <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                  />
                )}
              </div>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle" backgroundColor="black" color="white">
                  {revealCoupon.cupom ? "Voltar" : "Cancelar"}
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                position="absolute"
                top="0.5rem"
                right="0.5rem"
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </>
  );
};

export default ModalRandom;

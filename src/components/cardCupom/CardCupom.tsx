import { Box, Button, Dialog, Text } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import ModalRandom from "../modalRandom/ModalRandom";

interface CardProps {
  setReadyToSelect: Dispatch<SetStateAction<boolean>>;
  cupons: {
    store: string;
    description: string;
    discount: string;
    logo?: string;
    cupom: string;
    link_cupom: string;
    link_partner: string;
  }[]
}

const CardCupom: React.FC<CardProps> = ({ setReadyToSelect, cupons }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white overflow-hidden w-full max-w-4xl">
      <img
        src="assets/images/brands/mercantil_blue.png"
        alt="Logo"
        className="w-32 h-32 md:w-40 md:h-40 object-contain p-2"
      />
      <Box
        className="flex flex-col justify-between p-6 w-full"
        marginLeft="10px"
        marginTop="10px"
      >
        <div>
          <Text
            className="text-xl text-black mb-2"
            fontWeight="bold"
            fontSize="1.2rem"
            marginBottom="0.5rem"
          >
            Parabéns! 🎉
          </Text>
          <p className="text-black">
            Seu boleto foi pago e agora você pode escolher seu{" "}
            <b>cupom de desconto </b>
            para aproveitar as melhores promoções das principais lojas do Brasil
            em diversos setores. 😄
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button
            variant="subtle"
            backgroundColor="blue"
            color="white"
            marginTop="10px"
            w="100%"
            maxW="15rem"
            onClick={() => setReadyToSelect(false)}
          >
            Garantir meu Cupom Selecionado
          </Button>
          <Dialog.Root
            placement="center"
            size={window.innerWidth <= 425 ? "sm" : "md"}
          >
            <Dialog.Trigger asChild>
              <Button
                variant="subtle"
                backgroundColor="blue"
                w="100%"
                maxW="15rem"
                color="white"
                marginTop="10px"
              >
                Garantir meu Cupom Aleatório
              </Button>
            </Dialog.Trigger>
            <ModalRandom cupons={cupons} />
          </Dialog.Root>
        </div>
      </Box>
    </div>
  );
};

export default CardCupom;

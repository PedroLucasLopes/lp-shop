import { Box, Button, Text } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

interface CardProps {
  setReadyToSelect: Dispatch<SetStateAction<boolean>>;
}

const CardCupom: React.FC<CardProps> = ({ setReadyToSelect }) => {
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

        <div className="mt-6">
          <Button
            variant="subtle"
            colorScheme="blue"
            marginBottom="10px"
            marginTop="10px"
            onClick={() => setReadyToSelect(false)}
          >
            Garantir meu Cupom
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default CardCupom;

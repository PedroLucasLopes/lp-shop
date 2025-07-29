import { Button, HStack } from "@chakra-ui/react";
import React from "react";

interface ClaimedCupomProps {
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
}

const ClaimedCupom: React.FC<ClaimedCupomProps> = ({ cupom }) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <img
        src={`assets/images/brands/${cupom.logo}`}
        className="rounded-lg max-w-44 max-h-44 margin-top"
      />
      <h1>Cupom Resgatado</h1>
      <p className="custom-title-cupom">{cupom.cupom}</p>
      <HStack>
        <Button
          variant="subtle"
          mt="1rem"
          onClick={() => window.open(cupom.link_partner)}
        >
          Ir para Loja
        </Button>
      </HStack>
    </div>
  );
};

export default ClaimedCupom;

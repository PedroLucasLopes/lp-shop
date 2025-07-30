import { Button, Menu, Portal, Separator } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

interface FilterProps {
  cupons: number;
  setSort: Dispatch<SetStateAction<{ alphabetical: string; discount: string }>>;
}

const Filter = ({ cupons, setSort }: FilterProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center custom-filter">
        <p className="text-black custom-title-cupom">
          {cupons} lojas disponíveis
        </p>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button
              size={window.innerWidth > 465 ? "lg" : "sm"}
              variant="solid"
              colorPalette="blue"
            >
              Ordenar Por
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="rename"
                  onClick={() =>
                    setSort({ discount: "", alphabetical: "alphabetical" })
                  }
                >
                  Ordem Alfabética
                </Menu.Item>
                <Menu.Item
                  value="rename"
                  onClick={() =>
                    setSort({
                      discount: "discount",
                      alphabetical: "",
                    })
                  }
                >
                  Maior Desconto
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </div>
      <Separator />
    </div>
  );
};

export default Filter;

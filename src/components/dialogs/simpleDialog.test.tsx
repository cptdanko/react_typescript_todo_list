import { render, screen } from "@testing-library/react";
import { SimpleDialog } from "./simpleDialog";

describe("Component test", () => {
    it("should render dialog with custom header and msg", () => {
        const customHdr = "Custom Header";
        const customMsg = "Custom message";
        const dialog = <SimpleDialog
            openDialog={true}
            handleClose={jest.fn()}
            dialogHeader={customHdr}
            dialogMessage="Custom message"
        />
        render(dialog);
        const renText = screen.getByTestId("simpleDialog");
        expect(renText).toHaveTextContent(customHdr);
        expect(renText).toHaveTextContent(customMsg);
    });
});
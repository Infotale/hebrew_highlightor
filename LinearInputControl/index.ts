import { IInputs, IOutputs } from "./generated/ManifestTypes";
import "./css/HebrewTextBox.css";

export class HebrewTextBox implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _notifyOutputChanged: () => void;
    private _container: HTMLDivElement;
    private _textBox: HTMLTextAreaElement;

    constructor() {}

    private setTextDirection(): void {
        this._textBox.dir = "rtl"; // Ensure the text direction is explicitly set
        this._textBox.style.direction = "rtl";
        this._textBox.style.textAlign = "right"; // Align text to the right
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;

        // Create a text area
        this._textBox = document.createElement("textarea") as HTMLTextAreaElement;
        this._textBox.className = "hebrew-textbox"; // Apply CSS class
        this._textBox.value = context.parameters.text.raw || "";

        this.setTextDirection();

        // Append the text area to the container
        this._container.appendChild(this._textBox);

        // Handle changes
        this._textBox.addEventListener("input", this.onTextChange.bind(this));
        this._textBox.addEventListener("mousedown", this.handleCaretPosition.bind(this)); // Track clicks
    }

    private forceCaretUpdate(): void {
        const cursorPosition = this._textBox.selectionStart;
        if (cursorPosition !== null) {
            this._textBox.setSelectionRange(cursorPosition, cursorPosition); // Manually update the caret position
        }
    }

    private handleCaretPosition(event: MouseEvent): void {
        const cursorPosition = this._textBox.selectionStart;
        if (cursorPosition !== null) {
            // Capture and log the current position
            // console.log(Cursor position before input: ${cursorPosition});
            // Optionally, you can store this position if needed for later
        }
    }
    
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        return
        // this._textBox.value = context.parameters.text.raw || "";
        // this.forceCaretUpdate();
    }

    public getOutputs(): IOutputs {
        return {
            text: this._textBox.value
        };
    }

    public destroy(): void {
        this._textBox.removeEventListener("input", this.onTextChange.bind(this));
    }

    private onTextChange(): void {

        this.forceCaretUpdate();
        this._notifyOutputChanged();
    }

    
}

export type BlockStyle = {
    backgroundColor?: string; // Make optional if defaults exist
    borderColor?: string;   // Make optional
    borderRadius?: number;  // Changed to number
    borderWidth?: number;   // Added
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    // Removed hasIndependentBorderRadius and hasIndependentPadding
}

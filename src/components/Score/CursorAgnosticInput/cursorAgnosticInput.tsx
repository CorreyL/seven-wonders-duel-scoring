interface CursorAgnosticInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  score: number;
}

/**
 * This component provides an HTML input element that, on first input after
 * onFocus fires, the value is replaced rather than appended to
 *
 * Rarely will a player need to modify their score such that they wish to append
 * a numeric value to the default (or previously input) value, hence to reduce
 * the number of inputs required from the user, just replace the value in the
 * first input
 */
function CursorAgnosticInput({
  onChange,
  score,
}: CursorAgnosticInputProps) {

  return (
    <input/>
  );
}

export default CursorAgnosticInput;
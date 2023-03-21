import { ButtonProps, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingButton = ({ loading, children, text, ...restProps }) => {
  return (
    <Button disabled={loading} variant="contained" {...restProps}>
      {text || children}
      {loading && (
        <CircularProgress color="secondary" sx={{ ml: 2 }} size={20} />
      )}
    </Button>
  );
};

export default LoadingButton;

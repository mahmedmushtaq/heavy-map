import { useEffect, useState } from "react";
import {
  allMarkers,
  generateRandomMarkersApi,
  totalMarkersDataPointsApi,
} from "@/src/helpers/api";
import { Button, Grid, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@/src/components/shared/LoadingButton";

const Home = () => {
  const [sampleData, setSampleData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalMarkersDataPoints, setTotalMarkersDataPoints] = useState("...");
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await allMarkers();
        console.log("res is ", res.data.Items);
      } catch (err) {
        console.log("err is ", err);
      }
    })();
  }, []);

  const handleAddData = async () => {
    setLoading(true);
    setErr("");

    const mapArry = new Array(1).fill(0).map(async () => {
      try {
        await generateRandomMarkersApi(500);
      } catch (err) {
        console.log("err in generateRandomMarkersApi ", err);
      }
    });

    try {
      await Promise.all(mapArry);
    } catch (err) {
      console.log("err in Promise.all ", err);
      setErr("err in generating the data");
    }

    setLoading(false);
  };

  const handleOpenMap = () => {
    window.location.href = `/map`;
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Typography variant="h4" component="h2">
            General Details about the data
          </Typography>
        </Grid>

        <Grid item>
          {/* <LoadingButton
            color="primary"
            variant="text"
            size="large"
            sx={{ py: 2 }}
            loading={loading}
            onClick={handleAddData}
          >
            Add 500 sample items in dynamodb
          </LoadingButton> */}
        </Grid>
        <Grid item mt={2}>
          <Button sx={{ fontSize: 20 }} onClick={handleOpenMap}>
            Open Map
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

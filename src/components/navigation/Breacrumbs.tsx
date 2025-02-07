import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BreacrumbsProps {
  currentPageTitle: string;
  inBetweenLink?: {
    title: string;
    path: string;
  }
}
export function Breacrumbs({ currentPageTitle, inBetweenLink }: BreacrumbsProps) {
  const navigate = useNavigate();
  return (
    <Breadcrumbs
      separator=">"
      aria-label="breadcrumb"
      sx={{
        backgroundColor: "hsl(240, 3%, 94%)",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "1rem",
      }}
    >
      <Link
        underline="hover"
        color="inherit"
        onClick={() => {
          navigate("/");
        }}
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>

      {inBetweenLink && (
        <Link
        underline="hover"
        color="inherit"
        onClick={() => {
          navigate(inBetweenLink.path);
        }}
        sx={{ cursor: "pointer" }}
      >
        {inBetweenLink.title}
      </Link>
      )}
      <Typography color="text.primary">{currentPageTitle}</Typography>
    </Breadcrumbs>
  );
}

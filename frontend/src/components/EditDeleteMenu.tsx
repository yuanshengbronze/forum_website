import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

type Props = {
  canModify: boolean;
  onEdit: () => void;
  onDelete: () => void;
  disabledReason?: string;
};

const EditDeleteMenu = ({
  canModify,
  onEdit,
  onDelete,
  disabledReason,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  return (
    <>
      <Tooltip
        title={canModify ? "" : (disabledReason ?? "Not allowed")}
        disableHoverListener={canModify}
      >
        <span>
          <IconButton size="small" onClick={handleOpen} disabled={!canModify}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onEdit();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default EditDeleteMenu;

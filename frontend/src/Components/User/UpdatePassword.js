import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../Layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";



const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
  const navigate = useNavigate()
    const { error, isUpdated, loading } = useSelector((state) => state.profile);


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [shown, setShown] = useState(false);


    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(updatePassword(myForm));
      };
    


      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("Profile Updated Successfully");
    
          navigate("/account");
    
          dispatch({
            type: UPDATE_PASSWORD_RESET,
          });
        }
      }, [dispatch, error, alert, navigate, isUpdated]);



    return(
        <Fragment>
            {loading ? (
                <Loader/>
            ): (
                <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="updatePassword">
                  <VpnKeyIcon />
                  <input
                    type={shown ? "text" : "password"}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <FiEye className="reveal" onClick={() => setShown(!shown)} />
                </div>

                <div className="updatePassword">
                  <LockOpenIcon />
                  <input
                    type={shown ? "text" : "password"}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <FiEye className="reveal" onClick={() => setShown(!shown)} />
                </div>
                <div className="updatePassword">
                  <LockIcon />
                  <input
                    type={shown ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <FiEye className="reveal" onClick={() => setShown(!shown)} />
                </div>
                <input
                  type="submit"
                  value="Update Password"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
            )}
        </Fragment>
    )




}


export default UpdatePassword
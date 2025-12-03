import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import ProfileHeader from "./ProfileHeader";
import UserInfo from "./UserInfo";
import { UserRepository } from "../../../data/repositories/userRepository/UserRepository";
import { getAuth } from "firebase/auth";

const repository = new UserRepository();

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const auth = getAuth();
  const fUser = auth.currentUser;
  const avatarUrl = fUser ? fUser.photoURL : null;

  useEffect(() => {
    const fetchUser = async () => {
      if (fUser && fUser.email) {
        try {
          const userData = await repository.getUserByEmail(fUser.email);
          setUser(userData);
          setEditedUser(userData); // Initialize editedUser with fetched data
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUser();
  }, [fUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(user); // Reset changes
    setShowAlert(false);
  };

  const handleSaveClick = async () => {
    try {
      await repository.updateUser(editedUser.id, editedUser);
      setUser(editedUser); // Update the main user state to reflect changes in UI
      setAlertVariant('success');
      setAlertMessage('¡Cambios guardados con éxito!');
      setShowAlert(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      setAlertVariant('danger');
      setAlertMessage('Error al guardar los cambios. Inténtalo de nuevo.');
      setShowAlert(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <p>No user data found.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <ProfileHeader user={user} avatarSrc={avatarUrl} />
          {showAlert && (
            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
              {alertMessage}
            </Alert>
          )}
          <UserInfo 
            user={user}
            isEditing={isEditing}
            editedUser={editedUser}
            handleEditClick={handleEditClick}
            handleCancelClick={handleCancelClick}
            handleSaveClick={handleSaveClick}
            handleChange={handleChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

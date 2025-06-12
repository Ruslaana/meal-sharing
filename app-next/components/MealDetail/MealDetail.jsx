'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const MealDetail = ({ id }) => {
  const router = useRouter();

  const [meal, setMeal] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [reviewForm, setReviewForm] = useState({
    name: '',
    review: '',
    stars: '',
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/meals/${id}`);
        const data = await res.json();
        setMeal(data);
      } catch (err) {
        console.error('Error fetching meal', err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/reviews/meal/${id}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews', err);
      }
    };

    fetchMeal();
    fetchReviews();
  }, [id]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Simple validation
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setModalMessage({ type: 'error', text: 'Please enter a valid email.' });
      setModalOpen(true);
      return;
    }
    if (!/^[0-9]{6,}$/.test(formData.phone)) {
      setModalMessage({
        type: 'error',
        text: 'Please enter a valid phone number.',
      });
      setModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meal_id: id,
          name: formData.name,
          email: formData.email,
          phonenumber: formData.phone,
        }),
      });

      if (!res.ok) throw new Error('Reservation failed');

      setModalMessage({ type: 'success', text: 'Reservation successful!' });
      setModalOpen(true);
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      setModalMessage({ type: 'error', text: 'Reservation failed!' });
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewChange = e => {
    setReviewForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReviewSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewForm.name,
          review: reviewForm.review,
          stars: Number(reviewForm.stars),
          meal_id: id,
        }),
      });

      if (!res.ok) throw new Error('Review failed');

      setReviewForm({ name: '', review: '', stars: '' });
      const updated = await fetch(
        `http://localhost:3001/api/reviews/meal/${id}`,
      );
      const data = await updated.json();
      setReviews(data);
    } catch (err) {
      console.error('Error posting review', err);
    }
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={() => router.back()}
        variant="outlined"
        sx={{
          alignSelf: 'flex-start',
          mb: 2,
          fontFamily: 'Inter, sans-serif',
          color: '#ff8a80',
          borderColor: '#ff8a80',
          '&:hover': { backgroundColor: '#ffebee', borderColor: '#ff5252' },
        }}
      >
        ← Back
      </Button>

      <Paper sx={{ p: 4, maxWidth: 700, width: '100%' }} elevation={4}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Inter, sans-serif',
            mb: 2,
            textAlign: 'center',
            color: '#f48fb1',
          }}
        >
          {meal.title}
        </Typography>

        <img
          src={
            meal.img_url || 'https://placeholder.apptor.studio/600/400/meal.png'
          }
          alt={meal.title}
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '12px',
            margin: '0 auto 24px auto',
            display: 'block',
          }}
        />

        <Typography variant="body1" sx={{ mb: 1, textAlign: 'center' }}>
          {meal.description}
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, textAlign: 'center' }}>
          Price: ${meal.price}
        </Typography>

        {meal.available_reservations > 0 ? (
          <>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Inter, sans-serif',
                color: '#f48fb1',
                mt: 2,
                mb: 2,
                textAlign: 'center',
              }}
            >
              Book a Seat
            </Typography>

            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: 500, margin: '0 auto' }}
            >
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <TextField
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              {loading ? (
                <Typography textAlign="center">Submitting...</Typography>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  Book Seat
                </Button>
              )}
            </form>
          </>
        ) : (
          <Alert severity="warning" sx={{ mt: 4 }}>
            No available reservations for this meal.
          </Alert>
        )}

        {/* Review Form */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Inter, sans-serif',
            color: '#f48fb1',
            mt: 6,
            mb: 2,
            textAlign: 'center',
          }}
        >
          Leave a Review
        </Typography>

        <form
          onSubmit={handleReviewSubmit}
          style={{ maxWidth: 500, margin: '0 auto' }}
        >
          <TextField
            label="Name"
            name="name"
            value={reviewForm.name}
            onChange={handleReviewChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Review"
            name="review"
            value={reviewForm.review}
            onChange={handleReviewChange}
            multiline
            rows={3}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Rating (1-5)"
            name="stars"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={reviewForm.stars}
            onChange={handleReviewChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="secondary">
            Submit Review
          </Button>
        </form>

        {/* Reviews List */}
        <Typography
          variant="h6"
          sx={{
            mt: 6,
            mb: 1,
            fontFamily: 'Inter, sans-serif',
            color: '#f48fb1',
          }}
        >
          Reviews
        </Typography>

        {reviews.length === 0 ? (
          <Typography sx={{ fontStyle: 'italic' }}>No reviews yet.</Typography>
        ) : (
          reviews.map(r => (
            <Box
              key={r.id}
              sx={{
                mt: 2,
                p: 2,
                border: '1px solid #eee',
                borderRadius: 2,
                backgroundColor: '#fffdf8',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', color: '#ff8a80' }}
              >
                {r.name} ({r.stars}⭐)
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {r.review}
              </Typography>
            </Box>
          ))
        )}
      </Paper>

      {/* Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {modalMessage.type === 'success' ? 'Success' : 'Error'}
        </DialogTitle>
        <DialogContent>
          <Typography>{modalMessage.text}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MealDetail;

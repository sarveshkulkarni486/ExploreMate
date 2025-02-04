
---

### **Database Schema**

#### **1. Users Table**
| **Column Name**       | **Data Type**   | **Description**                            |
|------------------------|-----------------|--------------------------------------------|
| `user_id`             | INT (PK)       | Unique identifier for each user.           |
| `name`                | VARCHAR(100)   | User's full name.                          |
| `email`               | VARCHAR(100)   | User's email address.                      |
| `password`            | VARCHAR(255)   | Encrypted password.                        |
| `profile_photo`       | VARCHAR(255)   | URL of the profile photo.                  |
| `preferences`         | JSON           | User preferences in JSON format.           |
| `is_guest`            | BOOLEAN        | Indicates if the user is a guest.          |

---

#### **2. Guides Table**
| **Column Name**       | **Data Type**   | **Description**                            |
|------------------------|-----------------|--------------------------------------------|
| `guide_id`            | INT (PK)       | Unique identifier for each guide.          |
| `name`                | VARCHAR(100)   | Guide's full name.                         |
| `bio`                 | TEXT           | Short biography of the guide.              |
| `gender`              | ENUM           | Gender of the guide (Male/Female/Other).   |
| `languages`           | JSON           | Languages spoken by the guide.             |
| `price_per_hour`      | DECIMAL(10,2)  | Hourly rate for the guide.                 |
| `transportation`      | JSON           | Available transportation options.          |
| `ratings`             | FLOAT          | Average rating of the guide.               |

---

#### **3. Tours Table**
| **Column Name**       | **Data Type**   | **Description**                            |
|------------------------|-----------------|--------------------------------------------|
| `tour_id`             | INT (PK)       | Unique identifier for each tour.           |
| `guide_id`            | INT (FK)       | Foreign key linking to `guides`.           |
| `title`               | VARCHAR(255)   | Title of the tour.                         |
| `description`         | TEXT           | Description of the tour.                   |
| `duration`            | INT            | Duration of the tour in hours.             |
| `category`            | ENUM           | Tour type (Cultural, Adventure, etc.).     |
| `price`               | DECIMAL(10,2)  | Price for the tour.                        |
| `photos`              | JSON           | URLs of tour-related photos.               |

---

#### **4. Bookings Table**
| **Column Name**       | **Data Type**   | **Description**                            |
|------------------------|-----------------|--------------------------------------------|
| `booking_id`          | INT (PK)       | Unique identifier for each booking.        |
| `user_id`             | INT (FK)       | Foreign key linking to `users`.            |
| `tour_id`             | INT (FK)       | Foreign key linking to `tours`.            |
| `date`                | DATE           | Booking date.                              |
| `time`                | TIME           | Booking time.                              |
| `status`              | ENUM           | Status (Pending, Confirmed, Completed).    |
| `total_price`         | DECIMAL(10,2)  | Total price of the booking.                |

---

#### **5. Reviews Table**
| **Column Name**       | **Data Type**   | **Description**                            |
|------------------------|-----------------|--------------------------------------------|
| `review_id`           | INT (PK)       | Unique identifier for each review.         |
| `user_id`             | INT (FK)       | Foreign key linking to `users`.            |
| `guide_id`            | INT (FK)       | Foreign key linking to `guides`.           |
| `rating`              | INT            | Star rating (1-5).                         |
| `review_text`         | TEXT           | Written review.                            |
| `photos`              | JSON           | Optional photos/videos in the review.      |

---

#### **6. Notifications Table**
| **Column Name**       | **Data Type**   | **Description**                            |
|------------------------|-----------------|--------------------------------------------|
| `notification_id`     | INT (PK)       | Unique identifier for notifications.       |
| `user_id`             | INT (FK)       | Foreign key linking to `users`.            |
| `message`             | TEXT           | Notification content.                      |
| `read_status`         | BOOLEAN        | Read or unread status.                     |
| `created_at`          | TIMESTAMP      | Time of notification creation.             |

---

#### **7. Transactions Table**
| **Column Name**       | **Data Type**   | **Description**                            |
|------------------------|-----------------|--------------------------------------------|
| `transaction_id`      | INT (PK)       | Unique identifier for transactions.        |
| `booking_id`          | INT (FK)       | Foreign key linking to `bookings`.         |
| `amount`              | DECIMAL(10,2)  | Amount paid.                               |
| `payment_method`      | ENUM           | Payment method (Card, PayPal, etc.).       |
| `status`              | ENUM           | Payment status (Success, Failed).          |
| `created_at`          | TIMESTAMP      | Time of transaction.                       |

---

### **Entity-Relationship (ER) Diagram**
1. **Users (1) ↔ (N) Bookings**: A user can make multiple bookings.
2. **Guides (1) ↔ (N) Tours**: A guide can offer multiple tours.
3. **Bookings (1) ↔ (1) Transactions**: A booking has a single transaction.
4. **Users (1) ↔ (N) Reviews**: A user can write multiple reviews.
5. **Guides (1) ↔ (N) Reviews**: A guide can have multiple reviews.


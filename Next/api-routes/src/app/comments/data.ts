export const comments=[
  {
    "id": "1",
    "commentMessage": "This is the first comment!",
    "commentedTime": "2025-11-03T10:00:00Z",
    "replies": [
      {
        "id": "c1_r1",
        "commentMessage": "This is a reply to the first comment.",
        "commentedTime": "2025-11-03T10:05:00Z",
        "replies": [
          {
            "id": "c1_r1_r1",
            "commentMessage": "Nested reply to the first reply.",
            "commentedTime": "2025-11-03T10:07:00Z"
          }
        ]
      },
      {
        "id": "c1_r2",
        "commentMessage": "Another reply to the first comment.",
        "commentedTime": "2025-11-03T10:10:00Z"
      }
    ]
  },
  {
    "id": "2",
    "commentMessage": "Second top-level comment here.",
    "commentedTime": "2025-11-03T11:00:00Z",
    "replies": [
      {
        "id": "c2_r1",
        "commentMessage": "Replying to second comment.",
        "commentedTime": "2025-11-03T11:05:00Z"
      }
    ]
  },
  {
    "id": "3",
    "commentMessage": "Third comment, no replies yet.",
    "commentedTime": "2025-11-03T12:00:00Z"
  }
]

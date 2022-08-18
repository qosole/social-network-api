const { Schema, Types, model } = require('mongoose');

// Schema for reactions
const reactionSchema = new Schema(
    {
        reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
        },
        reactionBody: {
          type: String,
          required: true,
          maxLength: 280
        },
        username: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: format
        }
    }
)

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: format
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// This getter function will return the createdAt date in mm/dd/yyyy format
function format(createdAt) {
    const yyyy = createdAt.getFullYear();
    let mm = createdAt.getMonth() + 1; // Months start at 0 so need to add 1 for normal format
    let dd = createdAt.getDate();

    // Adding a leading zero if necessary
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return mm + '/' + dd + '/' + yyyy;
}

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
 
// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

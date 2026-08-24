import json
from django.db.models import Count
from django.db.models.functions import TruncDate
from apps.responses.models import Response, Answer

def get_survey_analytics(survey):
    # Total Responses
    total_responses = Response.objects.filter(survey=survey).count()

    # Responses Per Day
    daily_responses = (
        Response.objects
        .filter(survey=survey)
        .annotate(
            day=TruncDate("submitted_at")
        )
        .values("day")
        .annotate(
            total=Count("id")
        )
        .order_by("day"))

    # Question Breakdown
    question_breakdown = []

    for question in survey.questions.all():

        total_answers = Answer.objects.filter(
            question=question
        ).count()

        question_breakdown.append(
            {
                "question_id": question.id,
                "question_text": question.question_text,
                "question_type": question.question_type,
                "total_answers": total_answers,
            }
        )

    # Rating Analytics
    rating_summary = []

    rating_questions = survey.questions.filter(
        question_type="rating"
    )

    for question in rating_questions:

        ratings = []

        answers = Answer.objects.filter(
            question=question
        )

        for answer in answers:

            try:
                value = int(
                    json.loads(
                        answer.answer_text
                    )
                )

                ratings.append(value)

            except Exception:
                continue

        average_rating = (
            round(
                sum(ratings) / len(ratings),
                2
            )
            if ratings
            else 0
        )

        rating_summary.append(
            {
                "question_id": question.id,
                "question_text": question.question_text,
                "average_rating": average_rating,
                "total_ratings": len(ratings),
            }
        )

    # Multiple Choice / Dropdown / Checkbox Statistics
    option_statistics = []

    choice_questions = survey.questions.filter(
        question_type__in=[
            "multiple_choice",
            "checkbox",
            "dropdown"
        ]
    )

    for question in choice_questions:

        option_counts = {}

        answers = Answer.objects.filter(
            question=question
        )

        for answer in answers:

            try:

                value = json.loads(
                    answer.answer_text
                )

                # Checkbox answers
                if isinstance(
                    value,
                    list
                ):
                    for item in value:
                        option_counts[item] = (
                            option_counts.get(
                                item,
                                0
                            ) + 1
                        )

                # Multiple choice / dropdown
                else:
                    option_counts[value] = (
                        option_counts.get(
                            value,
                            0
                        ) + 1
                    )

            except Exception:
                continue

        option_statistics.append(
            {
                "question_id": question.id,
                "question_text": question.question_text,
                "results": option_counts,
            }
        )

    # Completion Rate
    total_questions = survey.questions.count()

    completion_rate = 0

    if total_questions > 0 and total_responses > 0:

        total_expected_answers = (
            total_questions *
            total_responses
        )

        actual_answers = Answer.objects.filter(
            response__survey=survey
        ).count()

        completion_rate = round(
            (
                actual_answers /
                total_expected_answers
            ) * 100,
            2
        )

    return {
        "total_responses": total_responses,
        "completion_rate": completion_rate,
        "responses_per_day": list(daily_responses),
        "question_breakdown": (question_breakdown),
        "rating_summary": (rating_summary),
        "option_statistics": (option_statistics),
    }
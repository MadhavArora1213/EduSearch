const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admissionseason.com' },
    update: {},
    create: {
      email: 'admin@admissionseason.com',
      name: 'Super Admin',
      password_hash: 'admin123',
      role: 'SUPER_ADMIN',
    },
  })

  // Create a Sample College
  const college = await prisma.college.upsert({
    where: { slug: 'iit-bombay' },
    update: {},
    create: {
      name: 'Indian Institute of Technology Bombay',
      slug: 'iit-bombay',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'GOVERNMENT',
      is_verified: true,
      naac_grade: 'A++',
      about_description: 'A premier engineering institute in India.',
    }
  })

  // Create a Sample Course for the College
  const course = await prisma.course.upsert({
    where: { id: 'sample-cse-iitb' }, // Mocking an ID for deterministic seed
    update: {},
    create: {
      id: 'sample-cse-iitb',
      college_id: college.id,
      name: 'B.Tech Computer Science and Engineering',
      stream: 'Engineering',
      degree_level: 'UG',
      duration_years: 4.0,
      total_fees: 800000,
      study_mode: 'FULL_TIME',
    }
  })

  // Create a Sample Exam
  const exam = await prisma.exam.upsert({
    where: { slug: 'jee-main' },
    update: {},
    create: {
      name: 'JEE Main',
      slug: 'jee-main',
      full_name: 'Joint Entrance Examination - Main',
      level: 'NATIONAL',
      mode: 'Online',
      exam_date: new Date('2026-04-10'),
    }
  })

  // Create a Cutoff record
  await prisma.cutoff.create({
    data: {
      course_id: course.id,
      exam_id: exam.id,
      year: 2025,
      category: 'GENERAL',
      cutoff_type: 'RANK',
      opening_value: 1,
      closing_value: 67,
      quota: 'All India',
      counseling_round: 'Round 1',
    }
  })

  // Create a Sample Scholarship
  await prisma.scholarship.upsert({
    where: { id: 'sample-scholarship-1' },
    update: {},
    create: {
      id: 'sample-scholarship-1',
      name: 'Post-Matric Scholarship Scheme',
      category: 'GOVERNMENT',
      target_category: 'SC/ST/OBC',
      income_limit: 250000,
      merit_percentage_min: 50.0,
      amount_description: 'Full tuition fee reimbursement',
      about_scholarship: 'A central scholarship scheme for students belonging to minority communities.',
      deadline: new Date('2026-10-31'),
    }
  })

  // Create a Sample Student for the Review
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'John Doe',
      password_hash: 'student123',
      role: 'STUDENT',
    },
  })

  // Create a Sample Review
  await prisma.review.create({
    data: {
      college_id: college.id,
      student_id: student.id,
      course_id: course.id,
      academic_rating: 9.0,
      faculty_rating: 8.5,
      infrastructure_rating: 9.0,
      accommodation_rating: 8.0,
      placement_rating: 9.5,
      social_life_rating: 8.5,
      overall_rating: 8.75,
      batch_year: 2024,
      admission_year: 2020,
      title: 'Amazing Campus Life and Placements',
      course_review: 'The CSE curriculum is world-class and very rigorous.',
      faculty_review: 'Professors are experts in their fields and very approachable.',
      campus_life_review: 'Mood Indigo is the best college fest in Asia!',
      placement_review: 'Top tech companies like Google, Microsoft, and Uber visit the campus.',
      admission_review: 'Admission is based on JEE Advanced rank.',
      fees_review: 'Fees are subsidized for many students, but the base rate is a bit high.',
      pros: 'Top tier placements, great alumni network.',
      cons: 'Very competitive environment.',
      sentiment_label: 'POSITIVE',
      quality_score: 95,
      status: 'PENDING',
    }
  })

  // Create a Sample Lead
  await prisma.lead.create({
    data: {
      student_id: student.id,
      college_id: college.id,
      student_name: 'Jane Smith',
      student_phone: '+919876543210',
      student_email: 'jane.smith@example.com',
      course_interest: 'B.Tech CSE',
      city: 'Pune',
      quality_score: 'HIGH',
      status: 'NEW',
      source_page: '/colleges/iit-bombay',
      utm_source: 'Google',
      utm_medium: 'CPC',
      utm_campaign: 'BTech2026',
    }
  })

  // Create a Sample College Admin
  const collegeAdmin = await prisma.user.upsert({
    where: { email: 'admin@iitb.ac.in' },
    update: {},
    create: {
      email: 'admin@iitb.ac.in',
      name: 'College Administrator',
      password_hash: 'iitb123',
      role: 'COLLEGE_ADMIN',
    },
  })

  // Link College to Admin
  await prisma.college.update({
    where: { slug: 'iit-bombay' },
    data: { claimed_by_user_id: collegeAdmin.id }
  })

  console.log({ admin, college, exam, collegeAdmin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

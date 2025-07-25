// import { prisma } from "./getPrismaClient";
// import bcrypt from "bcrypt";

// const createSuperAdmin = async () => {
//     const hashedPassword = await bcrypt.hash("superadmin@123", 10);
//     const personalInfo = await prisma.personalInfo.create({
//         data: {
//             gender: "Male", dob: new Date("1990-01-01"), address: "123 Admin Street, India", city: "Pune",
//             state: "Maharashtra", country: "India", pinCode: "411001", nationality: "Indian", aadharUrl: "https://example.com/aadhar.jpg", panCardUrl: "https://example.com/pancard.jpg", fatherName: "admin father", motherName: "admin mother"
//         }
//     });

//     const superAdmin = await prisma.superAdmin.create({
//         data: {
//             title: "Mr.", firstName: "Om", middleName: null,
//             lastName: "Argade", officialEmailId: "superadmin@kuinbee.com", personalEmailId: "om.personal@kuinbee.com", phNo: "9876543210", alternativePhNo: "9123456780", personalInfoId: personalInfo.id,
//         }
//     });

//     await prisma.auth.create({
//         data: { email: "superadmin@kuinbee.com", password: hashedPassword, role: 'SUPERADMIN', superAdminId: superAdmin.id }
//     })


//     console.log("🌱 SuperAdmin seeded successfully");
// }

// createSuperAdmin().then((resolve) => { console.log(resolve) }).catch((reject) => { console.log(reject) }).finally(async () => { await prisma.$disconnect(); })
import { NextRequest, NextResponse } from 'next/server';
import { getTeamMemberById, updateTeamMember, deleteTeamMember } from '@/lib/queries/team';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  const member = await getTeamMemberById(id);
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(member);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    const body = await req.json();
    await updateTeamMember(id, body);
    return NextResponse.json({ message: 'Team member updated' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    await deleteTeamMember(id);
    return NextResponse.json({ message: 'Team member deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
